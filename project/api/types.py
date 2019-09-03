import graphene
import graphql_jwt

from graphene_django.types import DjangoObjectType
from .models import User, Task, Group, GroupMembers
from .enums import task_priority_enum


class TaskType(DjangoObjectType):
    priority = task_priority_enum()

    class Meta:
        model = Task
        fields = '__all__'


class UserType(DjangoObjectType):
    created_tasks = graphene.List(TaskType)
    assigned_tasks = graphene.List(TaskType)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'date_joined', 'last_login', 'created_tasks', 'assigned_tasks', )


class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)


class GroupMemberType(DjangoObjectType):
    class Meta:
        model = GroupMembers
        exclude = ('member.password', )


class GroupType(DjangoObjectType):
    all_members = graphene.List(GroupMemberType)

    class Meta:
        model = Group
        fields = '__all__'