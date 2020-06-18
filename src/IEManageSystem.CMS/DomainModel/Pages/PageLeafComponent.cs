﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class PageLeafComponent : PageComponentBase
    {
        public PageLeafComponent(string name) : base(name)
        {
        }

        public PageLeafSetting PageLeafSetting { get; set; }
    }
}
