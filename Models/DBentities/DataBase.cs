﻿using MySql.Data.MySqlClient;
using Schedule.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MeetingPlanner.Models.DBentities
{
    public class DataBase : DaoI
    {
        MySqlConnection mySqlConnection = new MySqlConnection("Database=schedule;Data Source=localhost;User Id=root;Password=;SslMode=none;");

        public long UserRegistration(User user)
        {
            mySqlConnection.Open();

            MySqlCommand mySqlCommand = mySqlConnection.CreateCommand();
            mySqlCommand.CommandText = "INSERT INTO person(login, password, email, role) VALUES('" + user.login + "','" + user.password + "','" + user.email + "','" + user.role + "');";
            mySqlCommand.ExecuteNonQuery();
            return mySqlCommand.LastInsertedId;
        }

        public User getUserByLoginAndPassword(string login, string password)
        {
            mySqlConnection.Open();

            MySqlCommand mySqlCommand = mySqlConnection.CreateCommand();
            mySqlCommand.CommandText = "SELECT id, login, password, email, role FROM person WHERE login = '" + login + "' AND password = '" + password + "';";
            MySqlDataReader reader = mySqlCommand.ExecuteReader();
            reader.Read();
            User user = new User(Int32.Parse(reader["id"].ToString()), reader["login"].ToString(), reader["password"].ToString(), reader["email"].ToString(), reader["role"].ToString());
            reader.Close();
            return user;
        }

        public void OrganizationRegistration(Organization organization)
        {
            MySqlCommand mySqlCommand = mySqlConnection.CreateCommand();
            mySqlCommand.CommandText = "INSERT INTO organization(name, description, specialization, head) VALUES('" + organization.name + "','" + organization.description + "','" + organization.specialization + "','" + organization.personId + "');";
            mySqlCommand.ExecuteNonQuery();
        }

        public Organization getOrganizationByHead(long headId)
        {
            MySqlCommand mySqlCommand = mySqlConnection.CreateCommand();
            mySqlCommand.CommandText = "SELECT id,name, description, specialization FROM organization WHERE head = " + headId + ";";
            MySqlDataReader reader = mySqlCommand.ExecuteReader();
            reader.Read();
            Organization organization = new Organization(Int32.Parse(reader["id"].ToString()),reader["name"].ToString(), reader["description"].ToString(), reader["specialization"].ToString());
            reader.Close();
            return organization;
        }
    }
}