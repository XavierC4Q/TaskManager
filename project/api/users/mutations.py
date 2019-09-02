import graphene
import graphql_jwt
from graphql_jwt.decorators import login_required
from project.api.models import User
from project.api.types import UserType, ObtainJSONWebToken as JWT


class SignUpMutation(graphene.Mutation):
    new_user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String(required=True)
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    @staticmethod
    def mutate(info, *args, **kwargs):
        try:
            new_user = User.objects.create_user(username=kwargs['username'], email=kwargs['email'],
                                                password=kwargs['password'])
            new_user.save()
            return SignUpMutation(new_user=new_user)
        except:
            raise Exception('Failed to create user')


class EditUserMutation(graphene.Mutation):
    edited_user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()

    @login_required
    def mutate(self, info, *args, **kwargs):
        user = info.context.user
        try:
            if kwargs.get('password'):
                password = kwargs.pop('password')
                user.set_password(password)

            for (key, val) in kwargs.items():
                user[key] = val

            user.save()

            return EditUserMutation(edited_user=user)
        except:
            raise Exception('Failed to edit user')


class Mutation(graphene.ObjectType):
    get_token = JWT.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    signup = SignUpMutation.Field()
    edit_user = EditUserMutation.Field()
