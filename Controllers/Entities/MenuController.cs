using Microsoft.AspNetCore.Mvc;
using MyHome.Model.App.Resources.Get;
using MyHome.Model.App.Services.Contracts;
using System.Collections.Generic;

namespace MyHome.Controllers.Entities
{
    [Route("private/api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuService;
        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Menu> menus = _menuService.GetMenus();

            return Ok(menus);
        }
    }
}