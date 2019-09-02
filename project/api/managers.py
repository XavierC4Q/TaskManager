from django.db import models
from django.contrib.auth.models import UserManager


class UserTasksManager(UserManager):
    @staticmethod
    def get_created_tasks(user_id):
        from .models import Task
        created_tasks = Task.objects.filter(created_by__id=user_id)
        return created_tasks

    @staticmethod
    def get_assigned_tasks(user_id):
        from .models import Task
        assigned_tasks = Task.objects.filter(assigned_to__id=user_id)
        return assigned_tasks


class GroupManager(models.Manager):
    @staticmethod
    def get_all_members(group_id):
        from .models import GroupMembers
        all_members = GroupMembers.objects.filter(group__id=group_id)
        return all_members
