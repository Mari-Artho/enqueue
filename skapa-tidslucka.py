import requests

from pprint import pprint

# hämta genom https://enqueue.kottnet.net/api/authenticate
from hemlig_enqueue import api_token

# skapa en session för att hålla kakorna
s = requests.session()

# logga in
r = s.get(
    "http://localhost:8080/api/authenticate",
    headers={"Token": api_token},
)

print("loggain r.status_code=", r.status_code)
print("loggain text", r.text)
#pprint(r.json())

# skapa en tidslucka
#r = s.post(
#    "https://enqueue.kottnet.net/api/queues/tilpro/bookings",
#    json={
#        "external_id": "1234",
#        "timestamp": 1651384800000,
#        "removal_duration": None,
#        "comment": "www.svt.se",
#        "location": None,
#        "students": [
#            {"user_name": "mazenm"},
#        ],
#    },
#)
# skapa en tidslucka
#r = s.post(
#    "https://enqueue.kottnet.net/api/queues/tilpro/bookings",
#    json={
#        "external_id": None,
#        "timestamp": 1651442400000,
#        "removal_duration": None,
#        "comment": "jag är på zoom",
#        "location": "https://www.epochconverter.com/",
#        "students": [
#            {"user_name": "lk"},
#            {"user_name": "dbosk"},
#        ],
#    },
#)
#print(r.status_code)
#print(r.text)
#pprint(r.json())
# r = s.post(
#     "http://localhost:8080/api/queues/tilpro/bookings",
#     json={
#         'comment': "'https://kth-se.zoom.us/j/7583921381 d1-d2'",
#         'external_id': None,
#         'location': None,
#         'removal_duration': 1000000,
#         'students': [{'user_name': 'ashenawa'}],
#         'timestamp': 1679667153000,
#         'zz': None}
# )

r = s.post(
    "http://localhost:8080/api/queues/tilpro/bookings",
    json={
        'comment': "'https://kth-se.zoom.us/j/7583921381 d1-d2'",
        'external_id': None,
        'location': "zoom",
        'removal_duration': 1000000,
        'students': [{'user_name': 'artho2'}],
        'timestamp': 1679667153000,
        'zz': None}
)


print("r.status_code=", r.status_code)
print("-------------------")
print("r.text=",r.text)

#pprint(r.json())
#1679667153000
#1647959900000
#1680328800000
