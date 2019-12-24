﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Abp.Domain.Repositories;
using Abp.ObjectMapping;
using Abp.UI;
using IEManageSystem.Common.DomainModel;
using IEManageSystem.Dtos.Common;
using IEManageSystem.Services.ManageHome.Setting.SiteSettings.Dto;

namespace IEManageSystem.Services.ManageHome.Setting.SiteSettings
{
    public class SiteSettingManageAppService : IEManageSystemAppServiceBase, ISiteSettingManageAppService
    {
        private IRepository<SiteSetting> _repository { get; set; }

        private IObjectMapper _objectMapper { get; set; }

        public SiteSettingManageAppService(IRepository<SiteSetting> repository,
            IObjectMapper objectMapper) 
        {
            _repository = repository;

            _objectMapper = objectMapper;
        }

        public GetSiteSettingsOutput GetSiteSettings(GetSiteSettingsInput input)
        {
            var siteSettings = _repository.GetAll();

            return new GetSiteSettingsOutput() { SiteSettings = _objectMapper.Map<List<SiteSettingDto>>(siteSettings) };
        }

        public SetSiteSettingsOutput SetSiteSettings(SetSiteSettingsInput input)
        {
            var groups = input.SiteSettings.GroupBy(e => new { e.Group, e.Key });
            if (groups.Any(e => e.Count() > 1)) 
            {
                throw new UserFriendlyException("设置未保存，不允许添加两个相同（组，键）的设置");
            }

            var keys = groups.Select(e=>e.Key);

            var siteSettings = from siteSetting in _repository.GetAll()
                               from key in keys
                               where siteSetting.Group == key.Group && siteSetting.Key == key.Key
                               select siteSetting;

            foreach (var dto in input.SiteSettings) 
            {
                var siteSetting = siteSettings.FirstOrDefault(e => e.Group == dto.Group && e.Key == dto.Key);
                if (siteSetting == null)
                {
                    _repository.Insert(new SiteSetting()
                    {
                        Key = dto.Key,
                        Value = dto.Value,
                        DisplayeName = dto.DisplayeName,
                        Group = dto.Group
                    });
                }
                else 
                {
                    siteSetting.DisplayeName = dto.DisplayeName;
                    siteSetting.Value = dto.Value;
                }
            }

            return new SetSiteSettingsOutput();
        }

        public DeleteSiteSettingsOutput DeleteSiteSettings(DeleteSiteSettingsInput input)
        {
            var keys = input.SiteSettings.Select(e => new { Group = e.Group, Key = e.Key });

            var siteSettings = from siteSetting in _repository.GetAll()
                               from key in keys
                               where siteSetting.Group == key.Group && siteSetting.Key == key.Key
                               select siteSetting;

            foreach (var siteSetting in siteSettings) {
                _repository.Delete(siteSetting);
            }

            return new DeleteSiteSettingsOutput();
        }
    }
}
