using MeetingPlanner.Models.DBentities;
using Schedule.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace MeetingPlanner.Controllers
{
    public class HomeController : Controller
    {
        DataBase dataBase = new DataBase();
        JavaScriptSerializer js = new JavaScriptSerializer();

        public ActionResult Index()
        {
            return View();
        }

        public string registration()
        {
            try
            {
                User user = new User();
                user.login = Request["login"];
                user.password = Request["password"];
                user.email = Request["email"];
                user.role = "ROLE_USER";
                dataBase.UserRegistration(user);
                return "true";
            }catch (Exception e)
            {
                return "false";
            }
        }

        public string authorization()
        {
            string login = Request["login"];
            string password = Request["password"];
            try
            {
                User user = dataBase.getUserByLoginAndPassword(login, password);
                if (user.role.Contains("ROLE_ADMIN"))
                {
                    Organization organization = dataBase.getOrganizationByHead(user.id);
                    organization.head = user;
                    return js.Serialize(organization);
                }
                return js.Serialize(user);
            }catch(Exception e)
            {
                return "false";
            }
        }

        public string organizationreg()
        {
            try
            {
                User user = new User();
                user.login = Request["login"];
                user.password = Request["password"];
                user.email = Request["email"];
                user.role = "ROLE_ADMIN";
                long userId = dataBase.UserRegistration(user);
                Organization organization = new Organization();
                organization.name = Request["name"];
                organization.description = Request["description"];
                organization.specialization = Request["specialization"];
                organization.personId = userId;
                dataBase.OrganizationRegistration(organization);
                return "true";
            }catch(Exception e)
            {
                return "false";
            }
        } 
    }
}