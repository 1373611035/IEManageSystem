#pragma checksum "F:\projects\IEManageSystem\src\IEManageSystem.Web\Views\Shared\Components\LanguageSelection\Default.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "6c315265714296871f1818978d8955f3ca980fd2"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared_Components_LanguageSelection_Default), @"mvc.1.0.view", @"/Views/Shared/Components/LanguageSelection/Default.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Shared/Components/LanguageSelection/Default.cshtml", typeof(AspNetCore.Views_Shared_Components_LanguageSelection_Default))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "F:\projects\IEManageSystem\src\IEManageSystem.Web\Views\_ViewImports.cshtml"
using Abp.Localization;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"6c315265714296871f1818978d8955f3ca980fd2", @"/Views/Shared/Components/LanguageSelection/Default.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8172c5306e538b7ee04af1d33e029e858cc1acf1", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared_Components_LanguageSelection_Default : IEManageSystem.Web.Views.IEManageSystemRazorPage<IEManageSystem.Web.Views.Shared.Components.LanguageSelection.LanguageSelectionViewModel>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(95, 98, true);
            WriteLiteral("<li class=\"dropdown\">\n    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n        <div");
            EndContext();
            BeginWriteAttribute("class", " class=\"", 193, "\"", 228, 1);
#line 4 "F:\projects\IEManageSystem\src\IEManageSystem.Web\Views\Shared\Components\LanguageSelection\Default.cshtml"
WriteAttributeValue("", 201, Model.CurrentLanguage.Icon, 201, 27, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(229, 22, true);
            WriteLiteral("></div>\n        <span>");
            EndContext();
            BeginContext(252, 33, false);
#line 5 "F:\projects\IEManageSystem\src\IEManageSystem.Web\Views\Shared\Components\LanguageSelection\Default.cshtml"
         Write(Model.CurrentLanguage.DisplayName);

#line default
#line hidden
            EndContext();
            BeginContext(285, 78, true);
            WriteLiteral("</span>\n        <b class=\"caret\"></b>\n    </a>\n    <ul class=\"dropdown-menu\">\n");
            EndContext();
#line 9 "F:\projects\IEManageSystem\src\IEManageSystem.Web\Views\Shared\Components\LanguageSelection\Default.cshtml"
         foreach (var language in Model.Languages)
        {
            if (language.Name != Model.CurrentLanguage.Name)
            {

#line default
#line hidden
            BeginContext(499, 22, true);
            WriteLiteral("                <li><a");
            EndContext();
            BeginWriteAttribute("href", " href=\"", 521, "\"", 634, 5);
#line 13 "F:\projects\IEManageSystem\src\IEManageSystem.Web\Views\Shared\Components\LanguageSelection\Default.cshtml"
WriteAttributeValue("", 528, Url.Action("ChangeCulture", "AbpLocalization"), 528, 47, false);

#line default
#line hidden
            WriteAttributeValue("", 575, "?cultureName=", 575, 13, true);
#line 13 "F:\projects\IEManageSystem\src\IEManageSystem.Web\Views\Shared\Components\LanguageSelection\Default.cshtml"
WriteAttributeValue("", 588, language.Name, 588, 16, false);

#line default
#line hidden
            WriteAttributeValue("", 604, "&returnUrl=", 604, 11, true);
#line 13 "F:\projects\IEManageSystem\src\IEManageSystem.Web\Views\Shared\Components\LanguageSelection\Default.cshtml"
WriteAttributeValue("", 615, Model.CurrentUrl, 615, 19, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(635, 5, true);
            WriteLiteral("><div");
            EndContext();
            BeginWriteAttribute("class", " class=\"", 640, "\"", 662, 1);
#line 13 "F:\projects\IEManageSystem\src\IEManageSystem.Web\Views\Shared\Components\LanguageSelection\Default.cshtml"
WriteAttributeValue("", 648, language.Icon, 648, 14, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(663, 8, true);
            WriteLiteral("></div> ");
            EndContext();
            BeginContext(672, 20, false);
#line 13 "F:\projects\IEManageSystem\src\IEManageSystem.Web\Views\Shared\Components\LanguageSelection\Default.cshtml"
                                                                                                                                                                       Write(language.DisplayName);

#line default
#line hidden
            EndContext();
            BeginContext(692, 10, true);
            WriteLiteral("</a></li>\n");
            EndContext();
#line 14 "F:\projects\IEManageSystem\src\IEManageSystem.Web\Views\Shared\Components\LanguageSelection\Default.cshtml"
            }
        }

#line default
#line hidden
            BeginContext(726, 15, true);
            WriteLiteral("    </ul>\n</li>");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IEManageSystem.Web.Views.Shared.Components.LanguageSelection.LanguageSelectionViewModel> Html { get; private set; }
    }
}
#pragma warning restore 1591
