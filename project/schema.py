import graphene

from project.api.users.schema import schema as user_schema
from project.api.groups.schema import schema as group_schema
from project.api.tasks.schema import schema as task_schema


class RootQuery(user_schema.Query, group_schema.Query, task_schema.Query, graphene.ObjectType, ):
    pass


class RootMutation(user_schema.Mutation, group_schema.Mutation, task_schema.Mutation, graphene.ObjectType, ):
    pass


schema = graphene.Schema(query=RootQuery, mutation=RootMutation)
