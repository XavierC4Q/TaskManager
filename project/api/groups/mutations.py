import graphene
from graphql_jwt.decorators import login_required
from project.api.models import Group, GroupMembers
from project.api.types import GroupType


class CreateGroupMutation(graphene.Mutation):
    new_group = graphene.Field(GroupType)

    class Arguments:
        group_name = graphene.String(required=True)
        group_purpose = graphene.String(required=True)

    @login_required
    def mutate(self, info, *args, **kwargs):
        user = info.context.user
        group_name = kwargs['group_name']
        group_purpose = kwargs['group_purpose']

        try:
            new_group = Group.objects.create(group_leader=user, group_name=group_name,
                                             group_purpose=group_purpose)
            new_group.save()
            first_member = GroupMembers.objects.create(group=new_group, member=user)
            first_member.save()

            return CreateGroupMutation(new_group=new_group)
        except:
            raise Exception('Failed to create group')


class Mutation(graphene.ObjectType):
    create_group = CreateGroupMutation.Field()
