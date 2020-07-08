using Microsoft.AspNetCore.Mvc;
using MyHome.Model.App.Services.Contracts;
using MyHome.Model.Entities.Resources.Get;
using System.Collections.Generic;

namespace MyHome.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return new List<User>();
        }

        [HttpGet]
        public IActionResult Get(Model.App.Resources.Get.User user)
        {
            var registeredUser = _userService.Get(user);
            return Ok(registeredUser);
        }

        [HttpPost]
        [Route("create")]
        public IActionResult CreateUser([FromBody]Model.App.Resources.Post.User user)
        {
            _userService.Create(user);
            return Ok();
        }
    }
}
