﻿using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class PageBaseConfigure : IEntityTypeConfiguration<PageBase>
    {
        public void Configure(EntityTypeBuilder<PageBase> builder)
        {
            builder.HasIndex(e => e.Name).IsUnique();
            builder.OwnsOne(e => e.Creator);
            builder.OwnsOne(e => e.LastUpdater);
            builder.HasDiscriminator(e => e.Discriminator).HasValue<StaticPage>(StaticPage.DiscriminatorName).HasValue<ContentPage>(ContentPage.DiscriminatorName);
        }
    }
}
