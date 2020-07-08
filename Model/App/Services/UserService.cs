using MyHome.Model.App.Services.Contracts;
using System;

namespace MyHome.Model.App.Services
{
    public class UserService : IUserService
    {
        public void Create(Resources.Post.User user)
        {
            
        }

        public Resources.Post.User Get(Resources.Get.User user)
        {
            return new Resources.Post.User();
        }
    }
}
