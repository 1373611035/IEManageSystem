﻿using IEManageSystem.CMS.DomainModel.Logics;
using IEManageSystem.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Tests.TestDatas
{
    public class LogicBuilder
    {
        private readonly IEManageSystemDbContext _context;

        public LogicBuilder(IEManageSystemDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            var logic = new Logic() {
                Name = "ComponentName1",
                Code = @"
        public void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, string request)
        {
            componentData.Field1 = ""1"";
        }
"
            };

            _context.Logics.Add(logic);
        }
    }
}
