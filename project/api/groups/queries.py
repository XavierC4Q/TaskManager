import graphene

from project.api.models import Group
from project.api.types import GroupType

class Query(graphene.ObjectType):
    all_groups = graphene.List(GroupType)
    single_group = graphene.Field(GroupType)
    user_groups = graphene.List(GroupType)

    def resolve_all_groups(self, info):
        return Group.objects.all()

    def resolve_single_group(self, info, group_id):
        return Group.objects.get(id=group_id)

    def resolve_user_groups(self, info, user_id):
        return Group.objects.filter(group_leader__id=user_id)
