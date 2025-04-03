import "./style.css";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLQbvm_KPgtu_gyLOJ2vewvJ8EavuUGbk",
  authDomain: "webrtc-firestore-95cba.firebaseapp.com",
  projectId: "webrtc-firestore-95cba",
  storageBucket: "webrtc-firestore-95cba.firebasestorage.app",
  messagingSenderId: "1099048086815",
  appId: "1:1099048086815:web:ab842a30fe7baf2879942a",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

firestore.collection("webrtc");

// HTML Elements
const startCallButton = document.getElementById("startCall");
const answerCallButton = document.getElementById("answerCall");
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

// Global state
const GLOBAL_CALL_ID = "GLOBAL_CALL_ID";
let localStream;
let remoteStream;
let peerConnection;
let localVideoStream;
let remoteVideoStream;

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302"],
    },
  ],
};

async function startCall() {
  const callDocument = firestore.collection("calls").doc(GLOBAL_CALL_ID);
  const offerCandidates = callDocument.collection("offerCandidates");
  const answerCandidates = callDocument.collection("answerCandidates");

  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  localVideo.srcObject = localStream;

  remoteStream = new MediaStream();
  remoteVideo.srcObject = remoteStream;

  peerConnection = new RTCPeerConnection(servers);

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = event => {
    event.streams[0].getTracks().forEach(track => {
      remoteStream.addTrack(track);
    });
  };

  peerConnection.onicecandidate = event => {
    event.candidate && offerCandidates.add(event.candidate.toJSON());
  };

  const offerDescription = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offerDescription);

  await callDocument.set({
    offer: {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    },
  });

  callDocument.onSnapshot(snapshot => {
    const data = snapshot.data();
    if (!peerConnection.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      peerConnection.setRemoteDescription(answerDescription);
    }
  });

  answerCandidates.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        if (peerConnection.remoteDescription) {
          peerConnection.addIceCandidate(candidate);
        }
      }
    });
  });
}

async function answerCall() {
  const callDocument = firestore.collection("calls").doc(GLOBAL_CALL_ID);
  const offerCandidates = callDocument.collection("offerCandidates");
  const answerCandidates = callDocument.collection("answerCandidates");

  peerConnection = new RTCPeerConnection(servers);

  peerConnection.onicecandidate = event => {
    event.candidate && answerCandidates.add(event.candidate.toJSON());
  };

  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  localVideo.srcObject = localStream;

  remoteStream = new MediaStream();
  remoteVideo.srcObject = remoteStream;

  localStream
    .getTracks()
    .forEach(track => peerConnection.addTrack(track, localStream));

  peerConnection.ontrack = event => {
    event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
  };

  const callSnapshot = await callDocument.get();
  if (!callSnapshot.exists || !callSnapshot.data()?.offer) {
    console.error("No offer found.");
    return;
  }

  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(callSnapshot.data().offer)
  );

  const answerDescription = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answerDescription);
  await callDocument.update({
    answer: { type: answerDescription.type, sdp: answerDescription.sdp },
  });

  offerCandidates.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        peerConnection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
      }
    });
  });
}

startCallButton.addEventListener("click", startCall);
answerCallButton.addEventListener("click", answerCall);
