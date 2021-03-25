from django.db import models

class Goods(models.Model):
    title = models.CharField(db_column='Title', max_length=200)  # Field name made lowercase.
    brand = models.CharField(db_column='Brand', max_length=50, blank=True)  # Field name made lowercase.
    type = models.CharField(db_column='Type', max_length=50, blank=True)  # Field name made lowercase.
    sex = models.CharField(db_column='Sex', max_length=100, blank=True)  # Field name made lowercase.
    size = models.CharField(db_column='Size', max_length=150, blank=True)  # Field name made lowercase.
    sizeparams = models.CharField(db_column='SizeParams', max_length=350, blank=True)  # Field name made lowercase.
    sizearray = models.CharField(db_column='SizeArray', max_length=300, blank=True)  # Field name made lowercase.
    color = models.CharField(db_column='Color', max_length=30, blank=True)  # Field name made lowercase.
    country = models.CharField(db_column='Country', max_length=30, blank=True)  # Field name made lowercase.
    price = models.IntegerField(db_column='Price', blank=True, null=True)  # Field name made lowercase.
    image = models.CharField(db_column='Image', max_length=200, blank=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'Goods'
