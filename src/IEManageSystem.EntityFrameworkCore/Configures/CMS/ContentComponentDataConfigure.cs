﻿using IEManageSystem.CMS.DomainModel.ComponentDatas;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class ContentComponentDataConfigure : IEntityTypeConfiguration<ContentComponentData>
    {
        public void Configure(EntityTypeBuilder<ContentComponentData> builder)
        {
            builder.HasBaseType<ComponentData>();
        }
    }
}
