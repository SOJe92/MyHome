using Lamar;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using MyHome.Model.App.Services.Contracts;
using System.IO;

namespace MyHome
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureContainer(ServiceRegistry services)
        {
            // Add your ASP.Net Core services as usual
            services.AddMvc();
            services.AddLogging();
            services.AddControllersWithViews();
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            // Also exposes Lamar specific registrations
            // and functionality
            services.Scan(scanner =>
            {
                // Here you can add various assembly scans
                // to ensure Lamar finds all your classes
                // and registers your project conventions.
                scanner.TheCallingAssembly();
                scanner.WithDefaultConventions();
                scanner.SingleImplementationsOfInterface();

                // Add all implementations of an interface
                scanner.AssemblyContainingType<IUserService>();
            });

            // You can create your own registries like with StructurMap
            // and use expressions to configure types
            //services.For<IAbstraction>().Use(new ConcreteImplementation());

            // Power up your architechture with the decorator pattern
            //services
            //    .For(typeof(ICommandHandler<>))
            //    .DecorateAllWith(typeof(ValidationCommandHandlerDecorator));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");

                endpoints.MapControllerRoute(
                    name: "api",
                    pattern: "api/{controller}/{id?}");
            });

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"ClientApp")),
                RequestPath = new PathString("/ClientApp/build")
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
