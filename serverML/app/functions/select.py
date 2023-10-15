from orm import Table, get_table
from app.config.config import CONFIG


Table.connect(config_dict=CONFIG)


def selectBike():
    Bikes = get_table('customers')
    newCus = Bikes(customer_id=1,name="thuong",address="dia chi")
    newCus.save()
    return newCus

