using Microsoft.AspNetCore.Mvc;
using MyHome.Model.App.Services.Contracts;

namespace MyHome.Controllers.App
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private readonly IMenuService _menuService;
        public MenuItemController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        [Route("{id:int}")]
        [HttpGet]
        public ActionResult<Model.App.Resources.Get.MenuItem> GetItem(int id)
        {
            var menu = _menuService.GetMenuItem(id);

            return Ok(menu);
        }
        [HttpPost]
        public ActionResult Create(Model.App.Resources.Post.MenuItem menuItem)
        {
            _menuService.AddMenuItem(menuItem);

            return Ok();
        }

        [Route("{id:int}")]
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            _menuService.DeleteMenuItem(id);

            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateItem(Model.App.Resources.Put.MenuItem menuItem)
        {
            _menuService.UpdateMenuItem(menuItem);
            return Ok();
        }
    }
}