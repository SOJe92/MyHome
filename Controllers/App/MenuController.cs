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

        [Route("{id:int}")]
        [HttpGet]
        public IActionResult Get(int id)
        {
            var menu = _menuService.GetMenu(id);

            return Ok(menu);
        }

        [HttpPost]
        public ActionResult Create(Model.App.Resources.Post.Menu menu)
        {
            _menuService.AddMenu(menu);

            return Ok();
        }

        [Route("{id:int}")]
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            _menuService.DeleteMenu(id);

            return Ok();
        }

        [HttpPut]
        public ActionResult Update(Model.App.Resources.Put.Menu menu)
        {
            _menuService.UpdateMenu(menu);
            return Ok();
        }
    }
}