using MyHome.Model.App.Services.Contracts;
using System;
using System.Collections.Generic;

namespace MyHome.Model.App.Services
{
    public class MenuService : IMenuService
    {
        public void AddMenu(Resources.Post.Menu menu)
        {
            throw new NotImplementedException();
        }

        public void AddMenuItem(Resources.Post.MenuItem menuItem)
        {
            throw new NotImplementedException();
        }

        public void DeleteMenu(int id)
        {
            throw new NotImplementedException();
        }

        public void DeleteMenuItem(int id)
        {
            throw new NotImplementedException();
        }

        public Resources.Get.Menu GetMenu(int id)
        {
            throw new NotImplementedException();
        }

        public Resources.Get.MenuItem GetMenuItem(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Resources.Get.Menu> GetMenus()
        {
            return new List<Resources.Get.Menu>()
            {
                new Resources.Get.Menu()
                {
                    Name = "TestMenu",
                    Created = DateTime.Now,
                    Items = new List<Resources.Get.MenuItem>()
                    {

                    }
                }
            };
        }

        public void UpdateMenu(Resources.Put.Menu menu)
        {
            throw new NotImplementedException();
        }

        public void UpdateMenuItem(Resources.Put.MenuItem menuItem)
        {
            throw new NotImplementedException();
        }
    }
}
