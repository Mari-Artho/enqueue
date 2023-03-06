import requests

from pprint import pprint

# hämta genom https://enqueue.kottnet.net/api/authenticate
from hemlig_enqueue import api_token

# skapa en session för att hålla kakorna
s = requests.session()

# logga in
r = s.get(
    "https://enqueue.kottnet.net/api/authenticate",
    headers={"Token": api_token},
)

print(r.status_code)
print(r.text)
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
r = s.post(
    "https://enqueue.kottnet.net/api/queues/tilpro/bookings",
    json={
        'comment': "'https://kth-se.zoom.us/j/7583921381 d1-d2'",
        'external_id': None,
        'location': None,
        'removal_duration': 1000000,
        'students': [{'user_name': 'ashenawa'}],
        'timestamp': 1647959900000,
        'zz': None}
)

print(r.status_code)
print("-------------------")
print(r.text)
print()
#pprint(r.json())
