using Microsoft.AspNetCore.Mvc;
using MyHome.Model.App.Services.Contracts;

namespace MyHome.Controllers.App
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuService;
        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var menu = _menuService.GetMenu(id);

            return Ok(menu);
        }

        [Route("item")]
        [HttpGet]
        public ActionResult<Model.App.Resources.Get.MenuItem> GetItem(int id)
        {
            var menu = _menuService.GetMenuItem(id);

            return Ok(menu);
        }

        [Route("add")]
        [HttpPost]
        public ActionResult Add(Model.App.Resources.Post.Menu menu)
        {
            _menuService.AddMenu(menu);

            return Ok();
        }

        [Route("addItem")]
        [HttpPost]
        public ActionResult AddItem(Model.App.Resources.Post.MenuItem menuItem)
        {
            _menuService.AddMenuItem(menuItem);

            return Ok();
        }

        [Route("deleteItem")]
        [HttpDelete]
        public ActionResult DeleteItem(int id)
        {
            _menuService.DeleteMenuItem(id);

            return Ok();
        }

        [Route("delete")]
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            _menuService.DeleteMenu(id);

            return Ok();
        }

        [Route("update")]
        [HttpPut]
        public ActionResult Update(Model.App.Resources.Put.Menu menu)
        {
            _menuService.UpdateMenu(menu);
            return Ok();
        }

        [Route("updateItem")]
        [HttpPut]
        public ActionResult UpdateItem(Model.App.Resources.Put.MenuItem menuItem)
        {
            _menuService.UpdateMenuItem(menuItem);
            return Ok();
        }
    }
}