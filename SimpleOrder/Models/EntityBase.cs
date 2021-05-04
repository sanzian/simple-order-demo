﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SimpleOrder.Models
{
    public class EntityBase
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}
