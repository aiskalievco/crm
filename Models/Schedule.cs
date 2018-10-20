﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schedule.Models
{
    public class Schedule
    {
        public long id { get; set; }
        public TimeSpan time { get; set; }
        public Boolean notify { get; set; }
        public long roomId { get; set; }
        public Room room { get; set; }
        public long courseId { get; set; }
        public Course course { get; set; }
        public long groupId { get; set; }
        public Group group { get; set; }
        public long instructorId { get; set; }
        public Instructor Instructor { get; set; }
    }
}
