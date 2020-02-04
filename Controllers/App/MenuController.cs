using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyHome.Model.App.Services.Contracts;
using MyHome.Model.App;

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
        public IActionResult GetItem(int id)
        {
            var menu = _menuService.GetMenuItem(id);

            return Ok(menu);
        }

        [Route("add")]
        [HttpPost]
        public IActionResult Add()
        {
            return Ok();
        }

        [Route("addItem")]
        [HttpPost]
        public IActionResult AddItem()
        {
            return Ok();
        }
    }
}