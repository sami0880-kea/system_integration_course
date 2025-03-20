import base64

message = "This is a random string"
encoded = base64.b64encode(message.encode()).decode()
decoded = base64.b64decode(encoded).decode()

print(message + " > " + encoded + " > " + decoded)
