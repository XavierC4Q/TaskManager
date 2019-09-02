import graphene
import enum


class TaskPriorityEnum(enum.Enum):
    LOW = 'low'
    MEDIUM = 'medium'
    HIGH = 'high'


task_priority_enum = graphene.Enum.from_enum(TaskPriorityEnum)
