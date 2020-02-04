using Microsoft.AspNetCore.Mvc;
using MyHome.Model.Entities.Resources.Get;
using System.Collections.Generic;

namespace MyHome.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        public UserController()
        {
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return new List<User>();
        }
    }
}
