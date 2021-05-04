using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimpleOrder.Services
{
    public class EntityServiceBase<T> : IDisposable
        where T : SimpleOrder.Models.EntityBase
    {

        public readonly IMongoCollection<T> data;
        protected IMongoClient client;
        //protected IClientSessionHandle session;
        protected IMongoDatabase database;

        public EntityServiceBase(IDatabaseSettings settings)
        {
            this.client = new MongoClient(settings.ConnectionString);
            //this.session = client.StartSession();
            this.database = client.GetDatabase(settings.DatabaseName);
            this.data = database.GetCollection<T>(typeof(T).Name);
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            var r = (await this.data.FindAsync(x => true)).ToList();
            return r;
        }

        public async Task<T> Get(string id)
        {
            var r = (await this.data.FindAsync(x => x.Id == id)).SingleOrDefault();
            return r;
        }

        public async Task<T> Add(T value)
        {
            this.data.InsertOne(value);
            return value;
        }

        public async Task Update(string id, T value)
        {
            await this.data.ReplaceOneAsync(x => x.Id == id, value);
        }

        public async Task Remove(string id)
        {
            await this.data.DeleteOneAsync(x => x.Id == id);
        }

        public void Dispose()
        {
            //if (this.session != null)
            //{
            //    this.session.Dispose();
            //}
            if (this.client != null)
            {
                this.client = null;
            }
        }
    }
}
