﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Abp.Domain.Repositories;
using Abp.UI;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Attributes;
using IEManageSystem.CMS.DomainModel.Menus;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Repositorys;
using IEManageSystem.Services.ManageHome.CMS.Menus.Dto;

namespace IEManageSystem.Services.ManageHome.CMS.Menus
{
    [ApiAuthorization(ApiScopeProvider.Menu)]
    public class MenuManageAppService : IEManageSystemAppServiceBase, IMenuManageAppService
    {
        private MenuManager _menuManager { get; set; }

        private IEfRepository<PageData, int> _pageDataRepository { get; set; }

        public MenuManageAppService(
            MenuManager menuManager,
            IEfRepository<PageData, int> pageDataRepository)
        {
            _menuManager = menuManager;
            _pageDataRepository = pageDataRepository;
        }

        private MenuBase CreateRootMenuForDto(MenuDto menuDto) 
        {
            MenuBase menu;

            if (menuDto.IsCompositeMenu()) {
                CompositeMenu compositeMenu;
                menu = compositeMenu = new CompositeMenu(menuDto.Name);
                compositeMenu.Menus = new List<MenuBase>();
                if (menuDto.Menus != null) {
                    foreach (var childMenuDto in menuDto.Menus) 
                    {
                        var childMenu = CreateRootMenuForDto(childMenuDto);
                        childMenu.SetRootMenu(compositeMenu);
                        compositeMenu.Menus.Add(childMenu);
                    }
                }
            }
            else if(menuDto.IsLeafMenu()) {
                menu = new LeafMenu(menuDto.Name);
            }
            else
            {
                throw new UserFriendlyException($"创建菜单失败，菜单{menuDto.Name}未指定类型");
            }

            menu.DisplayName = menuDto.DisplayName;
            menu.Icon = menuDto.Icon;
            menu.PageName = menuDto.PageName;
            menu.PageDataName = menuDto.PageDataName;

            return menu;

        }

        public AddMenuOutput AddMenu(AddMenuInput input) {
            var menu = CreateRootMenuForDto(input.Menu);

            if (!(menu is CompositeMenu)) {
                throw new UserFriendlyException($"菜单添加失败，菜单{menu.Name}必须是组合菜单");
            }

            _menuManager.AddRootMenu((CompositeMenu)menu);

            return new AddMenuOutput();
        }

        public RemoveMenuOutput RemoveMenu(RemoveMenuInput input)
        {
            _menuManager.RemoveRootMenu(input.Id);

            return new RemoveMenuOutput();
        }

        public UpdateMenuOutput UpdateMenu(UpdateMenuInput input)
        {
            var menu = CreateRootMenuForDto(input.Menu);

            if (!(menu is CompositeMenu))
            {
                throw new UserFriendlyException($"菜单更新失败，菜单{menu.Name}必须是组合菜单");
            }

            _menuManager.UpdateRootMenu(input.Menu.Id, (CompositeMenu)menu);

            return new UpdateMenuOutput();
        }
    }
}
