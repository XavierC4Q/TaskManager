import graphene
from django.shortcuts import get_object_or_404
from project.api.models import User
from project.api.types import UserType


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    single_user = graphene.Field(UserType, user_id=graphene.ID())
    logged_in_user = graphene.Field(UserType)

    @staticmethod
    def resolve_all_users(self, info):
        return User.objects.all()

    @staticmethod
    def resolve_single_user(self, info, user_id):
        return get_object_or_404(User, id=user_id)

    @staticmethod
    def resolve_logged_in_user(self, info):
        return info.context.user