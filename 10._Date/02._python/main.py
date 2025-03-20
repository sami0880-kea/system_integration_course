from datetime import datetime

current_date = datetime.now()
print(current_date)

current_date_str = current_date.strftime('%Y-%m-%dT%H:%M:%S')
print(current_date_str)

