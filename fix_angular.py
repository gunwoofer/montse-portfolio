import json
with open(angular.json) as f:
    d = json.load(f)
d[projects][montse-portfolio][architect][build][options][assets].append({glob:**/*,input:src/assets})
with open(angular.json,w) as f:
    json.dump(d, f, indent=2)
print(done)
