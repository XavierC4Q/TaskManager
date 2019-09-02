from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator
from .managers import UserTasksManager, GroupManager

low = ('LOW', 'Low')
medium = ('MEDIUM', 'Medium')
high = ('HIGH', 'High')


class User(AbstractUser):
    objects = UserTasksManager()

    username = models.CharField(max_length=30, blank=False, null=False,
                                validators=[MinLengthValidator(6, 'Username must be at least 6 characters')],
                                unique=True)
    email = models.EmailField(blank=False, null=False)

    @property
    def created_tasks(self):
        return User.objects.get_created_tasks(user_id=self.id)

    @property
    def assigned_tasks(self):
        return User.objects.get_assigned_tasks(user_id=self.id)

    def __str__(self):
        return f'User {self.username}'


class Group(models.Model):
    objects = GroupManager()

    group_name = models.CharField(max_length=30, blank=False, null=False,
                                  validators=[MinLengthValidator(6, 'Group name must be at least 6 characters')],
                                  unique=True)
    group_leader = models.ForeignKey(User, on_delete=models.CASCADE)
    group_purpose = models.TextField(blank=False, null=False)
    created_on = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    @property
    def all_members(self):
        return Group.objects.get_all_members(group_id=self.id)

    def __str__(self):
        return f'Group {self.group_name}'


class GroupMembers(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    member = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'Group {self.group.id}, Member {self.member.id}'


class Task(models.Model):
    priorities = (low, medium, high)

    title = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    priority = models.CharField(max_length=10, choices=priorities, default=low[1])
    created_on = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_by')
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assigned_to')
    completed = models.BooleanField(default=False)

    def complete_self(self):
        self.completed = True
        self.save()
        return True

    def __str__(self):
        return f'Task {self.title}'


class Comment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(blank=False, null=False)
    created = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Comment {self.id}'
