namespace MyHome.Model.App.Services.Contracts
{
    public interface IMenuService
    {
        void AddMenu(Resources.Post.Menu menu);

        void AddMenuItem(Resources.Post.MenuItem menuItem);

        void DeleteMenu(int id);

        void DeleteMenuItem(int id);

        void UpdateMenu(Resources.Put.Menu menu);

        void UpdateMenuItem(Resources.Put.MenuItem menuItem);

        Resources.Get.Menu GetMenu(int id);

        Resources.Get.MenuItem GetMenuItem(int id);
    }
}
