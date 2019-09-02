from django.contrib import admin
from django.contrib.auth.models import Group as BaseGroup
from .models import User, Group, GroupMembers, Task, Comment


class UserAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Basic Information', {'fields': ['username', 'email', ]}),
    ]
    list_display = ('username', 'id', 'last_login',
                    'date_joined', 'email',)


admin.site.unregister(BaseGroup)

admin.site.register(User, UserAdmin)
admin.site.register(Group)
admin.site.register(GroupMembers)
admin.site.register(Task)
admin.site.register(Comment)
