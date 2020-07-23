﻿using Abp.Domain.Entities;
using IEManageSystem.CMS.DomainModel.PageDatas;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Linq;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public abstract class PageBase : Entity
    {
        public PageBase(string name)
        {
            Name = name;
        }

        [Required]
        public string Name { get; protected set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }
    }
}
