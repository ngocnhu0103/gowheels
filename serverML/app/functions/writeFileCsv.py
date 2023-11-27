import csv



def writeFileCsv(data):
    header = ['bike_bike_id', 'bike_name', 'url']

    with open('data.csv','w', encoding='UTF8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=header)

        writer.writeheader()

        writer.writerows(data)