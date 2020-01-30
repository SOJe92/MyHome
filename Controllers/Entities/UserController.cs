using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyHome.Model.Entities;

namespace MyHome.Controllers
{
    [ApiController]
    [Route("api/user")]
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
