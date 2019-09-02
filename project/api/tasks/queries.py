import graphene
from django.shortcuts import get_object_or_404
from project.api.models import Task
from project.api.types import TaskType


class Query(graphene.ObjectType):
    all_tasks = graphene.List(TaskType)
    single_task = graphene.Field(TaskType, task_id=graphene.ID())

    @staticmethod
    def resolve_all_tasks(self, info):
        return Task.objects.all()

    @staticmethod
    def resolve_single_task(self, info, task_id):
        return get_object_or_404(Task, id=task_id)