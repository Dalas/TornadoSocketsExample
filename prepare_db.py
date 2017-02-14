from motor.motor_tornado import MotorClient


client = MotorClient(host='127.0.0.1', port=27017)
db = client.chat