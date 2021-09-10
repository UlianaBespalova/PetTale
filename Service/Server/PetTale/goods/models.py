
from django.db import models

class Boughts(models.Model):
    userid = models.ForeignKey('Users', on_delete=models.CASCADE, db_column='userId')  # Field name made lowercase.
    itemid = models.ForeignKey('Goods', on_delete=models.CASCADE, db_column='itemId')  # Field name made lowercase.
    date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Boughts'


class Goods(models.Model):
    title = models.CharField(db_column='Title', max_length=250, blank=True, null=True)  # Field name made lowercase.
    brand = models.CharField(db_column='Brand', max_length=50, blank=True, null=True)  # Field name made lowercase.
    type = models.CharField(db_column='Type', max_length=80, blank=True, null=True)  # Field name made lowercase.
    sex = models.CharField(db_column='Sex', max_length=100, blank=True, null=True)  # Field name made lowercase.
    size = models.CharField(db_column='Size', max_length=150, blank=True, null=True)  # Field name made lowercase.
    sizeparams = models.CharField(db_column='SizeParams', max_length=350, blank=True, null=True)  # Field name made lowercase.
    sizearray = models.CharField(db_column='SizeArray', max_length=1000, blank=True, null=True)  # Field name made lowercase.
    color = models.CharField(db_column='Color', max_length=120, blank=True, null=True)  # Field name made lowercase.
    country = models.CharField(db_column='Country', max_length=30, blank=True, null=True)  # Field name made lowercase.
    price = models.IntegerField(db_column='Price', blank=True, null=True)  # Field name made lowercase.
    image = models.CharField(db_column='Image', max_length=200, blank=True, null=True)  # Field name made lowercase.
    bought_num = models.IntegerField(db_column='Boughts', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Goods'


class Recoms(models.Model):
    id = models.OneToOneField('Users', on_delete=models.CASCADE, db_column='id', primary_key=True)
    recommends = models.CharField(db_column='Recommends', max_length=500)  # Field name made lowercase.
    need_update = models.IntegerField(db_column='Need_update', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Recoms'


class Users(models.Model):
    login = models.CharField(db_column='Login', max_length=50)  # Field name made lowercase.
    username = models.CharField(db_column='Username', max_length=50, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=50, blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', max_length=100, blank=True, null=True)  # Field name made lowercase.
    date_joined = models.DateTimeField(db_column='Date_joined', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Users'