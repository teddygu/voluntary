from utils.mongo import Mongo
import requests
import time

m = Mongo()

for page_num in range(1, 5):
    try:
        data = {"query":"query {\nsearchOrgSRP(input:{\nlocation: \"Minneapolis, MN, USA\"\ncategories: []\nkeywords: []\npageNumber: " + str(page_num) + "\nsortCriteria: null\nradius: \"20\"\nnumberOfResults: 25\n}){\nnumberOfResults\nresultsSize\ncurrentPage\nsortCriteria\nhasDistanceCriteria\ncityLocation\nsrpOrganizations{\ndetail {\ncategories\nid\nlocation {\ncity\ncountry\npostalCode\nregion\n}\nname\n}\ndistance\noppCount\nplaintextDescription\nupdated\n}}}","location":"Minneapolis, MN, USA"}
        orgs = requests.post('https://www.volunteermatch.org/s/srp/search', json=data).json()
    except:
        print('Error fetching organization list')
        continue
    for org in orgs['data']['searchOrgSRP']['srpOrganizations']:
        org_id = org['detail']['id']
        org_name = org['detail']['name']
        org_description = org['plaintextDescription']
        try:
            org_data = requests.get('https://www.volunteermatch.org/search/org{}.jsp'.format(org_id), headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}).text
            if org_data:
                org_lat = float(org_data.split('latitude" content="')[1].split('"')[0])
                org_lng = float(org_data.split('longitude" content="')[1].split('"')[0])
                org_db_id = m.create_organization(org_name, org_description)[0]
                event_db_id = m.create_event(org_lat, org_lng, org_db_id, org_name, org_description, 'VolunteerMatch')[0]
                print(org_db_id, event_db_id)
        except:
            print('Error fetching organization data')
        time.sleep(2)