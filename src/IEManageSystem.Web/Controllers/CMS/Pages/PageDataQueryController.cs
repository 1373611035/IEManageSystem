﻿using Abp.ObjectMapping;
using IEManageSystem.Web.Controllers;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.JwtAuthentication;
using IEManageSystem.Services.ManageHome.CMS.Pages;
using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.ApiAuthorization.DomainModel;
using IEManageSystem.ApiScopeProviders;
using IEManageSystem.Web.Controllers.CMS.Pages.Dto;
using IEManageSystem.Dtos.CMS;
using System.Linq.Dynamic.Core;
using Abp.Extensions;

namespace IEManageSystem.Web.Controllers.CMS.Pages
{
    [Route("api/[controller]/[action]")]
    public class PageDataQueryController : IEManageSystemControllerBase
    {
        private PageManager _pageManager { get; }

        private PermissionManager _permissionManager { get; }

        private ClaimManager _claimManager { get; }

        private IPageDataQueryAppService _pageDataQueryAppService { get; }

        private CheckPermissionService _checkPermissionService { get; }

        private IObjectMapper _objectMapper { get; }

        public PageDataQueryController(
            PageManager pageManager,
            ClaimManager claimManager,
            PermissionManager permissionManager,
            IPageDataQueryAppService pageDataQueryAppService,
            CheckPermissionService checkPermissionService,
            IObjectMapper objectMapper) 
        {
            _pageManager = pageManager;
            _claimManager = claimManager;
            _permissionManager = permissionManager;
            _pageDataQueryAppService = pageDataQueryAppService;
            _checkPermissionService = checkPermissionService;
            _objectMapper = objectMapper;
        }

        /// <summary>
        /// 获取用户可以访问或者可以管理的文章的页面
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<GetPagesOfUserCanAccessPostOutput> GetPagesOfUserCanAccessPost([FromBody]GetPagesOfUserCanAccessPostInput input)
        {
            IEnumerable<string> permissionNames = _claimManager.GetPermissionsForClaims(User.Claims);
            var permissions = _permissionManager.GetPermissionsForCache().Where(e => permissionNames.Contains(e.Name));

            IEnumerable<ContentPage> pages = null;

            if (input.QueryOrManage)
            {
                if (_checkPermissionService.IsAllowAccess(ApiScopeProvider.Page, false, permissions))
                {
                    pages = _pageManager.PageRepository.GetAll().OfType<ContentPage>().ToList();
                }
                else
                {
                    pages = _pageManager.GetPagesForManagePermission(permissions);
                }

            }
            else 
            {
                if (_checkPermissionService.IsAllowAccess(ApiScopeProvider.Page, true, permissions) ||
                    _checkPermissionService.IsAllowAccess(ApiScopeProvider.Page, false, permissions))
                {
                    pages = _pageManager.PageRepository.GetAll().OfType<ContentPage>().ToList();
                }
                else
                {
                    pages = _pageManager.GetPagesForQueryPermission(permissions);
                }
            }

            List<PageDto> pageDtos = new List<PageDto>();
            foreach (var page in pages) {
                pageDtos.Add(CreatePageDtos(page));
            }

            return new GetPagesOfUserCanAccessPostOutput()
            {
                Pages = pageDtos
            };
        }

        private PageDto CreatePageDtos(PageBase page)
        {
            var pageDto = new PageDto();
            pageDto.Id = page.Id;
            pageDto.Name = page.Name;
            pageDto.DisplayName = page.DisplayName;
            pageDto.Description = page.Description;
            pageDto.Field1Name = page.Field1Name;
            pageDto.Field2Name = page.Field2Name;
            pageDto.Field3Name = page.Field3Name;
            pageDto.Field4Name = page.Field4Name;
            pageDto.Field5Name = page.Field5Name;
            pageDto.Creator = _objectMapper.Map<EntityEditDto>(page.Creator);
            pageDto.LastUpdater = _objectMapper.Map<EntityEditDto>(page.LastUpdater);

            if (page is StaticPage)
            {
                pageDto.SetStaticPage();
            }
            else if (page is ContentPage)
            {
                pageDto.SetContentPage();

                var contentPage = (ContentPage)page;
                pageDto.ContentPagePeimissionCollection =
                    contentPage.ContentPagePermissionCollection != null ?
                        _objectMapper.Map<ContentPagePeimissionCollectionDto>(contentPage.ContentPagePermissionCollection)
                        : null;
            }

            return pageDto;
        }

        /// <summary>
        /// 获取用户可以访问的文章列表
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<GetPageDatasOutput> GetPageDatas([FromBody] Dto.GetPageDatasInput input)
        {
            IEnumerable<string> permissionNames = _claimManager.GetPermissionsForClaims(User.Claims);
            var permissions = _permissionManager.GetPermissionsForCache().Where(e => permissionNames.Contains(e.Name));

            Services.ManageHome.CMS.Pages.Dto.GetPageDatasInput appServiceInput = new Services.ManageHome.CMS.Pages.Dto.GetPageDatasInput();
            appServiceInput.PageIndex = input.PageIndex;
            appServiceInput.PageSize = input.PageSize;
            appServiceInput.SearchKey = input.SearchKey;
            appServiceInput.Top = input.Top;
            appServiceInput.Tags = input.Tags;
            appServiceInput.Orderby = input.Orderby;
            appServiceInput.PageName = input.PageName;

            // 如果用户具有 Page 域 的权限，则用户具有所有页面的访问权限
            if (_checkPermissionService.IsAllowAccess(ApiScopeProvider.Page, true, permissions))
            {
                appServiceInput.EnablePageFilter = false;
            }
            else
            {
                appServiceInput.EnablePageFilter = true;

                appServiceInput.PageIds = _pageManager.GetPagesForQueryPermission(permissions).Select(e => e.Id).ToList();
            }

            return _pageDataQueryAppService.GetPageDatas(appServiceInput);
        }

        /// <summary>
        /// 获取文章
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<GetPageDataOutput> GetPageData([FromBody] GetPageDataInput input)
        {
            int pageId;
            if (int.TryParse(input.PageName, out pageId)) 
            {
                string pageName = _pageManager.GetPageNameCache(pageId);

                if (!string.IsNullOrWhiteSpace(pageName)) {
                    input.PageName = pageName;
                }
            }

            IEnumerable<string> permissionNames = _claimManager.GetPermissionsForClaims(User.Claims);
            var permissions = _permissionManager.GetPermissionsForCache().Where(e => permissionNames.Contains(e.Name));

            if (_pageManager.IsCanQueryPost(input.PageName, permissions) ||
                _checkPermissionService.IsAllowAccess(ApiScopeProvider.Page, true, permissions))
            {
                input.IsCheckCreator = false;
            }
            else 
            {
                input.IsCheckCreator = true;
            }

            return _pageDataQueryAppService.GetPageData(input);
        }
    }
}
