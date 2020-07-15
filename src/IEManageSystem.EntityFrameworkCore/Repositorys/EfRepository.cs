﻿using Abp.Domain.Entities;
using Abp.EntityFrameworkCore;
using IEManageSystem.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.Repositorys
{
    public class EfRepository<TEntity, TPrimaryKey> : 
        EfRepositoryBase<TEntity, TPrimaryKey>, 
        IEfRepository<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        public EfRepository(IDbContextProvider<IEManageSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public IQueryable<TEntity> ThenInclude<ThenType>(
            Expression<Func<TEntity, IEnumerable<ThenType>>> includePath,
            Expression<Func<ThenType, object>> thenIncludePath)
        {
            return Context.Set<TEntity>().Include(includePath).ThenInclude(thenIncludePath);
        }

        public IQueryable<TEntity> ThenInclude<ThenType, ThenThenType>(Expression<Func<TEntity, IEnumerable<ThenType>>> includePath, Expression<Func<ThenType, IEnumerable<ThenThenType>>> thenIncludePath, Expression<Func<ThenThenType, object>> thenThenIncludePath)
        {
            return Context.Set<TEntity>().Include(includePath).ThenInclude(thenIncludePath).ThenInclude(thenThenIncludePath);
        }

        public void NoTracking() 
        {
            Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public void Tracking()
        {
            Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.TrackAll;
        }
    }
}
