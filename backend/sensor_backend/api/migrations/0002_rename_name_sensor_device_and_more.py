# Generated by Django 4.0.5 on 2022-06-19 15:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sensor',
            old_name='name',
            new_name='device',
        ),
        migrations.RenameField(
            model_name='sensorvalue',
            old_name='date',
            new_name='time',
        ),
        migrations.RemoveField(
            model_name='sensor',
            name='room',
        ),
        migrations.AddField(
            model_name='sensor',
            name='sensor_id',
            field=models.CharField(default='sensor_id', max_length=15),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('sensor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.sensor')),
            ],
        ),
    ]