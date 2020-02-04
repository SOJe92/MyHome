using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHome.Model.App.Services.Contracts
{
    public interface IMenuService
    {
        Resources.Post.Menu AddMenu();

        Resources.Post.MenuItem AddMenuItem();

        Resources.Delete.Menu DeleteMenu();

        Resources.Delete.MenuItem DeleteMenuItem();

        Resources.Put.Menu UpdateMenu();

        Resources.Put.MenuItem UpdateMenuItem();

        Resources.Get.Menu GetMenu(int id);

        Resources.Get.MenuItem GetMenuItem(int id);
    }
}
