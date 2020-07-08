namespace MyHome.Model.App.Services.Contracts
{
    public interface IUserService
    {
        void Create(Resources.Post.User user);

        Resources.Post.User Get(Resources.Get.User user);
    }
}
