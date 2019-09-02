import graphene
from graphql_jwt.decorators import login_required
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from project.api.models import User, Task
from project.api.types import TaskType
from project.api.enums import task_priority_enum


class CreateTaskMutation(graphene.Mutation):
    new_task = graphene.Field(TaskType)

    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        priority = task_priority_enum()
        assigned_to = graphene.ID(required=True)

    @login_required
    def mutate(self, info, *args, **kwargs):
        creator = info.context.user
        assigned = get_object_or_404(User, id=kwargs['assigned_to'])

        new_task = Task.objects.create(created_by=creator, assigned_to=assigned, title=kwargs['title'],
                                       description=kwargs['description'], priority=kwargs['priority'])
        new_task.save()
        # TODO: Set up a way to email users
        # send_mail(
        #     subject=f'New Task from {creator.username}',
        #     message='You have a new task!',
        #     from_email=creator.email,
        #     recipient_list=[assigned.email, ],
        #     fail_silently=False
        # )
        return CreateTaskMutation(new_task=new_task)


class CompleteTaskMutation(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        task_id = graphene.ID(required=True)

    @login_required
    def mutate(self, info, task_id):
        task = Task.objects.get(id=task_id)
        ok = task.complete_self()
        return CompleteTaskMutation(ok=ok)


class Mutation(graphene.ObjectType):
    create_task = CreateTaskMutation.Field()
    complete_task = CompleteTaskMutation.Field()