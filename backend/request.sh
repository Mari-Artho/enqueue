#!/bin/sh
curl -X POST "http://localhost:8081/queues/tilpro/bookings" \
-H 'Content-Type: application/json' \
-d '{"comment": "https://kth-se.zoom.us/j/7583921381 d1-d2",
     "external_id": "None",
     "location": "None",
     "removal_duration": "1000000",
     "students": "[{\"user_name\": \"ashenawa\"}]",
     "timestamp": "1677775054106",
     "zz": "None"}'
